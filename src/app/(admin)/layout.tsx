export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="p-5 h-full">
      <div className="mx-auto w-full h-full max-w-screen-lg">
        {children}
      </div>
    </div>
  )
}