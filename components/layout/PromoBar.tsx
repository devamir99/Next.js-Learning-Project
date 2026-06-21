import { Container } from "@/components/ui/Container";

type PromoBarProps = {
  message: string;
};

export function PromoBar({ message }: PromoBarProps) {
  return (
    <div className="border-b border-primary/20 bg-primary text-primary-foreground">
      <Container className="py-2 text-center text-xs font-medium sm:text-sm">
        {message}
      </Container>
    </div>
  );
}
