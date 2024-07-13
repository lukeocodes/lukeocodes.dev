import Link from 'next/link'

export function Intro() {
  return (
    <>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        Luke Oliff
        <br />
        <span className="text-sky-300">Developer Experience</span>
      </h1>
    </>
  )
}

export function IntroFooter() {
  return (
    <p className="text-[0.8125rem]/6 text-gray-500">
      Copyright &copy; {new Date().getFullYear()}{' '}
      <Link
        href="https://github.com/lukeocodes"
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-gray-400 underline hover:text-gray-50"
      >
        Luke Oliff
      </Link>
      . All rights reserved.
    </p>
  )
}
