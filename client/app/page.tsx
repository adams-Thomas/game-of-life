import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh] flex">
      <div className="m-auto w-fit">
        <h1>
          Welcome to Conways Game of Life
        </h1>

        <h4>
          This is just a small project to improve my personal skills in NextJS, Go and Sockets.
        </h4>

        If it is working, please enjoy.

        <div className="mt-8">
          <a className='btn p-[0.5625rem]' href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">
            Explanation
          </a>

          <Link href='/game' className="btn ml-8 p-[0.5625rem]">
            Continue
          </Link>
        </div>
      </div>
    </div>

  )
}
