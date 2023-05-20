export default function Layout({ children }: any) {
  return (
    <>
      <h1>Top</h1>
      <main>{children}</main>
      <h1>Bottom</h1>
    </>
  );
}
