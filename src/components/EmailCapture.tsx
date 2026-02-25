import { useState } from "react";

interface EmailCaptureProps {
  onSubmit: (firstName: string, email: string) => void;
}

const EmailCapture = ({ onSubmit }: EmailCaptureProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!firstName.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    console.log("Email captured:", { firstName, email });
    // Simulate brief loading for transition effect
    await new Promise((r) => setTimeout(r, 800));
    onSubmit(firstName.trim(), email.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in-up">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-5xl mb-2">✨</div>

        <h2 className="text-3xl sm:text-4xl font-heading font-bold">
          Your results are ready.
        </h2>

        <p className="text-muted-foreground font-body text-base">
          Enter your name and email to see your Courage Signature.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left mt-8">
          <div>
            <label className="block text-sm font-body font-medium mb-1.5 text-foreground">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body font-medium mb-1.5 text-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-3.5 hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Revealing...
              </span>
            ) : (
              "Reveal My Courage Type"
            )}
          </button>
        </form>

        <p className="text-[11px] text-muted-foreground pt-2">
          Your info stays private. We'll only use it to send you your results.
        </p>
      </div>
    </div>
  );
};

export default EmailCapture;
