export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px] transition-all duration-500 hover:opacity-30 hover:blur-[120px] animate-pulse" />
      <div className="absolute left-60 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px] transition-all duration-500 hover:opacity-30 hover:blur-[120px] animate-pulse delay-700" />
      <div className="absolute left-[20%] right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px] transition-all duration-500 hover:opacity-30 hover:blur-[120px] animate-pulse delay-1000" />
    </div>
  )
}
