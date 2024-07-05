// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    'next/link': [['default', 'Link']],
    'next/image': [['default', 'NextImage']],
    'next/navigation': ['useRouter', 'usePathname', 'useSearchParams'],
    'next/document': [
      ['NextScript', 'NextDocumentScript'],
      ['Html', 'NextDocumentHtml'],
      ['Document', 'NextDocument'],
      ['Html', 'NextDocumentHtml'],
      ['Head', 'NextDocumentHead'],
      ['Main', 'NextDocumentMain']
    ],
    'next/head': [
      ['default', 'NextHead']
    ],
    'next/script': [
      ['default', 'NextScript']
    ]
  },
  {
    from: 'next/app',
    imports: [['AppContext', 'NextAppContext'], ['AppProps', 'NextAppProps']],
    type: true
  },
  {
    from: 'next',
    imports: [['default', 'NextPage'], 'GetServerSidePropsContext', 'InferGetServerSidePropsType'],
    type: true
  },
  {
    from: 'next/document',
    imports: [['DocumentContext', 'NextDocumentContext']],
    type: true
  }
]
