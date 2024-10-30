import Navbar from "@/components/Layout/Navbar/Navbar";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <div className="w-full max-w-screen-lg flex-1 mx-auto">
        <hr/>
        <h1 className="text-[13rem] font-bold flex justify-between leading-none mb-[30px]">
          {/* <span>THE</span> <span>BLOG</span> */}
        </h1>
        <hr/>
        <div className="p-5">
          {children}
        </div>
      </div>
    </>
  );
}
