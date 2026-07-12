export function Footer() {
  return (
    <footer className="px-6 md:px-12 max-w-7xl mx-auto py-16 mt-24 border-t border-black/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-foreground font-medium">Vinayak Gupta</p>
          <p className="text-sm text-gray-500">Software Engineer & Builder</p>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <a
            href="https://github.com/ctrl-infinity"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/vinayak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@example.com"
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

