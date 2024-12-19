import { Helmet } from 'react-helmet';
import { Section } from '@/ui/components/layouts/Section';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Kata | Page introuvable</title>
      </Helmet>

      <main>
        <Section>
            Page introuvable
        </Section>
      </main>
    </>
  );
}

export default NotFound;