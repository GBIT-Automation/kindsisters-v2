interface PullQuoteProps {
  quote: string;
  attribution: string;
  className?: string;
}

/**
 * Subtle, understated pull-quote used as light trust-filler woven into the flow
 * of existing sections. Deliberately NOT a hero block or a grouped set — it sits
 * quietly inline. Testimonials are attributed by role only, no school or
 * organisation names, per the client brief.
 */
export default function PullQuote({
  quote,
  attribution,
  className = '',
}: PullQuoteProps) {
  return (
    <figure className={`max-w-2xl mx-auto text-center ${className}`}>
      <blockquote className="font-serif italic text-lg md:text-xl leading-relaxed text-kindness-deep/80">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-2 text-xs font-medium uppercase tracking-wider text-kindness/70">
        {attribution}
      </figcaption>
    </figure>
  );
}
