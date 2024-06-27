import { IconLink } from '@/components/IconLink'
import Link from 'next/link'
import { SiGithub, SiLinkedin, SiX } from '@icons-pack/react-simple-icons'

export function Intro() {
  return (
    <>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        Luke Oliff
        <br />
        <span className="text-sky-300">Developer Experience</span>
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        I build visually stunning demonstration products, fast.
      </p>
      <p className="mt-4 text-sm/6 text-gray-300">
        I am a seasoned Developer Experience Engineer with a rich background in
        software development, focusing on security and open-source. Based in the
        UK, I am an experienced remote worker with almost 8 years working for US
        organisations remotely.
      </p>
      <p className="mt-4 text-sm/6 text-gray-300">
        I am dedicated to enhancing developer tools and experiences, building
        visually stunning product demos, writing accessible guides and
        documentation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
        <IconLink
          href="https://twitter.com/lukeocodes"
          target="_blank"
          rel="noopener noreferrer"
          icon={() => <SiX color="#ffffff" size={12} />}
          className="flex-none"
        >
          Twitter
        </IconLink>
        <IconLink
          href="https://www.linkedin.com/in/lukeocodes/"
          target="_blank"
          rel="noopener noreferrer"
          icon={() => <SiLinkedin color="#0A66C2" size={12} />}
          className="flex-none"
        >
          LinkedIn
        </IconLink>
        <IconLink
          href="https://github.com/lukeocodes"
          target="_blank"
          rel="noopener noreferrer"
          icon={() => <SiGithub color="#ffffff" size={12} />}
          className="flex-none"
        >
          GitHub
        </IconLink>

        {/* <IconLink href="#" icon={GitHubIcon} className="flex-none">
          GitHub
        </IconLink>
        <IconLink href="/feed.xml" icon={FeedIcon} className="flex-none">
          RSS
        </IconLink> */}
      </div>
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
      {/* <IconLink href="#" icon={XIcon} compact>
        Joe Davola
      </IconLink> */}
    </p>
  )
}
