import * as React from "react"
import { Sparkles, Dice6, Undo2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { generateRandomSaasIdea } from "@/lib/aiEnhancer"
import { useToast } from "@/hooks/use-toast"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface EnhancedTextareaProps extends TextareaProps {
  onEnhance?: (value: string) => void;
  isEnhancing?: boolean;
  showEnhanceButton?: boolean;
  enableSmartSuggestions?: boolean;
  enableUndoFunctionality?: boolean;
  enableIdeaGenerator?: boolean;
  autoResize?: boolean;
  onIdeaGenerated?: (idea: string) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({
    className,
    onEnhance,
    isEnhancing = false,
    showEnhanceButton = true,
    enableSmartSuggestions = true,
    enableUndoFunctionality = true,
    enableIdeaGenerator = true,
    autoResize = true,
    onIdeaGenerated,
    value,
    onChange,
    ...props
  }, ref) => {
    const { toast } = useToast();
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [originalValue, setOriginalValue] = React.useState<string>('');
    const [showUndo, setShowUndo] = React.useState(false);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [showSuggestion, setShowSuggestion] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [undoTimer, setUndoTimer] = React.useState<NodeJS.Timeout | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current!);

    // Auto-resize functionality
    React.useEffect(() => {
      if (!autoResize || !textareaRef.current) return;

      const textarea = textareaRef.current;
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        const newHeight = Math.min(Math.max(textarea.scrollHeight, 80), 300); // min 80px, max 300px
        textarea.style.height = `${newHeight}px`;
      };

      adjustHeight();
    }, [value, autoResize]);

    // Smart suggestion detection
    React.useEffect(() => {
      if (!enableSmartSuggestions || !value || typeof value !== 'string') {
        setShowSuggestion(false);
        return;
      }

      const words = value.trim().split(/\s+/);
      const genericTerms = ['app', 'platform', 'tool', 'system', 'software', 'solution', 'service'];
      const hasGenericTerms = genericTerms.some(term =>
        value.toLowerCase().includes(term) && words.length < 15
      );

      const needsSuggestion = words.length < 10 || hasGenericTerms;
      setShowSuggestion(needsSuggestion && !isEnhancing && !isGenerating);
    }, [value, enableSmartSuggestions, isEnhancing, isGenerating]);

    // Auto-hide undo button after 30 seconds
    React.useEffect(() => {
      if (showUndo && undoTimer) {
        clearTimeout(undoTimer);
      }

      if (showUndo) {
        const timer = setTimeout(() => {
          setShowUndo(false);
          setOriginalValue('');
        }, 30000);
        setUndoTimer(timer);
      }

      return () => {
        if (undoTimer) clearTimeout(undoTimer);
      };
    }, [showUndo]);

    const handleEnhanceClick = () => {
      if (onEnhance && value && typeof value === 'string' && value.trim()) {
        // Store original value for undo functionality
        if (enableUndoFunctionality) {
          setOriginalValue(value);
        }
        onEnhance(value.trim());
      }
    };

    // Handle successful enhancement (called from parent)
    React.useEffect(() => {
      if (originalValue && enableUndoFunctionality && !isEnhancing) {
        setShowUndo(true);
        setShowSuggestion(false);
      }
    }, [isEnhancing, originalValue, enableUndoFunctionality]);

    const handleUndo = () => {
      if (originalValue && onChange) {
        const syntheticEvent = {
          target: { value: originalValue }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
        setShowUndo(false);
        setOriginalValue('');
        if (undoTimer) clearTimeout(undoTimer);
        textareaRef.current?.focus();

        toast({
          title: "Enhancement Undone",
          description: "Original content has been restored.",
        });
      }
    };

    const handleGenerateIdea = async () => {
      const hasContent = value && typeof value === 'string' && value.trim().length > 0;

      if (hasContent) {
        // Show confirmation dialog for existing content
        const confirmed = window.confirm(
          "This will replace your current content with a new AI-generated SaaS idea. Continue?"
        );
        if (!confirmed) return;
      }

      setIsGenerating(true);

      try {
        const result = await generateRandomSaasIdea();

        if (result.success) {
          // Store current value for undo if replacing content
          if (hasContent && enableUndoFunctionality) {
            setOriginalValue(value as string);
          }

          // Typewriter effect
          await typewriterEffect(result.idea);

          if (onIdeaGenerated) {
            onIdeaGenerated(result.idea);
          }

          toast({
            title: "Idea Generated!",
            description: "A new SaaS idea has been generated for you.",
          });
        } else {
          // Still use the idea even if there was an API error (fallback was used)
          await typewriterEffect(result.idea);

          toast({
            title: "Idea Generated",
            description: "Generated using offline suggestions. For better results, check your API configuration.",
          });
        }
      } catch (error) {
        console.error("Idea generation failed:", error);
        toast({
          title: "Generation Failed",
          description: "Unable to generate a new idea. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    };

    const typewriterEffect = async (text: string) => {
      if (!onChange || !textareaRef.current) return;

      setIsTyping(true);

      // Clear current content
      const clearEvent = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(clearEvent);

      // Type character by character
      for (let i = 0; i <= text.length; i++) {
        const partialText = text.substring(0, i);
        const syntheticEvent = {
          target: { value: partialText }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);

        // Small delay between characters
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      setIsTyping(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Hide undo button when user starts typing new content
      if (showUndo && !isTyping) {
        setShowUndo(false);
        setOriginalValue('');
        if (undoTimer) clearTimeout(undoTimer);
      }

      if (onChange) {
        onChange(e);
      }
    };

    const shouldShowEnhanceButton = showEnhanceButton && value && typeof value === 'string' && value.trim().length > 0;
    const shouldShowGenerateButton = enableIdeaGenerator;
    const hasButtons = shouldShowEnhanceButton || shouldShowGenerateButton;

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            hasButtons && "pr-16 sm:pr-20", // More padding for multiple buttons
            autoResize && "resize-none overflow-hidden",
            className
          )}
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          disabled={isEnhancing || isGenerating}
          {...props}
        />
        {/* Action buttons container */}
        {(shouldShowEnhanceButton || shouldShowGenerateButton) && (
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex gap-1">
            {/* Generate Idea Button */}
            {shouldShowGenerateButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  onClick={handleGenerateIdea}
                  disabled={isGenerating || isEnhancing}
                  className={cn(
                    "group relative p-1.5 sm:p-2 rounded-lg transition-all duration-200 transform",
                    "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "active:scale-95",
                    isGenerating && "bg-green-50 dark:bg-green-900/20 shadow-sm"
                  )}
                  aria-label="Generate random SaaS idea"
                  title={isGenerating ? "Generating..." : "Generate random idea"}
                >
                  <Dice6
                    className={cn(
                      "w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200",
                      isGenerating ? "animate-spin text-green-500" : "group-hover:text-green-500",
                      "group-hover:scale-110 group-active:scale-95"
                    )}
                  />
                  {isGenerating && (
                    <div className="absolute inset-0 rounded-lg border-2 border-green-200 animate-ping opacity-75" />
                  )}
                </button>
                {/* Generate tooltip */}
                <div className={cn(
                  "absolute bottom-full right-0 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg",
                  "opacity-0 pointer-events-none transition-all duration-200 transform translate-y-1",
                  "group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap z-20",
                  "before:content-[''] before:absolute before:top-full before:right-3 before:border-4 before:border-transparent before:border-t-gray-900 dark:before:border-t-gray-700"
                )}>
                  {isGenerating ? "🎲 Generating..." : "🎲 Generate idea"}
                </div>
              </motion.div>
            )}

            {/* Enhance Button */}
            {shouldShowEnhanceButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: shouldShowGenerateButton ? 0.1 : 0 }}
              >
                <button
                  type="button"
                  onClick={handleEnhanceClick}
                  disabled={isEnhancing || isGenerating}
                  className={cn(
                    "group relative p-1.5 sm:p-2 rounded-lg transition-all duration-200 transform",
                    "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "active:scale-95",
                    isEnhancing && "bg-blue-50 dark:bg-blue-900/20 shadow-sm",
                    showSuggestion && "ring-2 ring-blue-300 animate-pulse"
                  )}
                  aria-label="Enhance SaaS idea with AI"
                  title={
                    showSuggestion
                      ? "This idea needs more detail. Tap ✨ to enhance!"
                      : isEnhancing
                        ? "Enhancing..."
                        : "Enhance with AI"
                  }
                >
                  <Sparkles
                    className={cn(
                      "w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200",
                      isEnhancing ? "animate-pulse text-blue-500" : "group-hover:text-blue-500",
                      showSuggestion && "text-blue-400 animate-pulse",
                      "group-hover:scale-110 group-active:scale-95"
                    )}
                  />
                  {isEnhancing && (
                    <div className="absolute inset-0 rounded-lg border-2 border-blue-200 animate-ping opacity-75" />
                  )}
                  {showSuggestion && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-blue-300 opacity-50"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </button>
                {/* Enhanced tooltip */}
                <div className={cn(
                  "absolute bottom-full right-0 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg",
                  "opacity-0 pointer-events-none transition-all duration-200 transform translate-y-1",
                  "group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap z-20",
                  "before:content-[''] before:absolute before:top-full before:right-3 before:border-4 before:border-transparent before:border-t-gray-900 dark:before:border-t-gray-700"
                )}>
                  {showSuggestion
                    ? "💡 This idea needs more detail. Tap ✨ to enhance!"
                    : isEnhancing
                      ? "✨ Enhancing..."
                      : "✨ Enhance with AI"
                  }
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Undo Enhancement Button */}
        <AnimatePresence>
          {showUndo && enableUndoFunctionality && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute -bottom-12 left-0 z-30"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <button
                  type="button"
                  onClick={handleUndo}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium",
                    "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100",
                    "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600",
                    "rounded-md transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  )}
                  aria-label="Undo enhancement"
                >
                  <Undo2 className="w-4 h-4" />
                  <span>Undo enhancement</span>
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Auto-hide in 30s
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
EnhancedTextarea.displayName = "EnhancedTextarea"

export { Textarea, EnhancedTextarea }
