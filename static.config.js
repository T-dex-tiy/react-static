import axios from 'axios'
import React, { Component } from 'react'

export default {
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40dexmills&api_key=thq3gphqkkxyc77nrihfnsyt3cmlw8oxsvvpvajn&order_by=pubDate&count=100')
    console.log(posts);
    return [
      {
        path: '/',
      },
      {
        path: '/about',
      },
      {
        path: '/blog',
        getProps: () => ({
          posts,
        }),
        children: (posts.items).map(post => ({
          path: `/post/${post.id}`,
          getProps: () => ({
            post,
          }),
        })),
      },
    ]
  },
  Html: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children } = this.props
      return (
        <Html lang="en-US">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="/app.css" />
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
