import { defineConfig } from 'vitepress'
import { getPosts, getPostLength } from './theme/serverUtils'

export default defineConfig({
  base: '/blog/',
  title: '微光北下',
  description: 'Home of 微光北下',
  themeConfig: {
    // logo: '/horse.svg',
    posts: await getPosts(),
    avator: '/blog/avator.png',
    pageSize: 5,
    postLength: await getPostLength(),
    search: {
      provider: 'local'
    },
    outline: false,
    nav: [
      { text: '🏡 博客', link: '/' },
      { text: '🔖 标签', link: '/tags' },
      { text: '📃 文章', link: '/archives' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/wgbx' }]
  }
})
