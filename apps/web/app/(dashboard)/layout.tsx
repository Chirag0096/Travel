import { PageWrapper } from '../../components/layout/PageWrapper';
import { Sidebar } from '../../components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-7xl">
      <Sidebar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
}
