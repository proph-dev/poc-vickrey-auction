import { Toaster } from "@/shadcn/components/toaster";
import { Navbar } from '@/ui/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Container } from '@/ui/components/container/Container';
import { Footer } from '@/ui/components/footer/Footer';
import style from './layouts.module.scss';

const PageLayout = () => {
  return (
    <>
      <Navbar />

      <div className={ style.pageContent }>
        <Container>
          <Outlet />
        </Container>
      </div>

      <Footer />
      <Toaster />
    </>
  );
}

export default PageLayout;