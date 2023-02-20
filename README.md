# Blockenberg

[![Built on FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes) [![Built by FISSION](https://img.shields.io/badge/webnative-v0.34.1-purple.svg)](https://github.com/fission-suite/webnative)

What is this project [about](https://blockenberg.vercel.app/) in human language?
How do I [display content](https://github.com/vorcigernix/blockenblog) from this CMS?

The Blockenberg provides an interface for editing documents that are uploaded to IPFS storage, allowing for a decentralized but user friendly content publishing. Our application is built on top of Webnative App Template and utilize a lot of built in webnative functions.

The app is [deployed](https://blockenberg.fission.app) on Fission and you can use it in any way you want. If you want your own instance, you can clone this repository and change the app name in `/src/lib/app-info.ts`, but there is a little reason to do that - the data you publish are published under your own credentials on IPFS and I do not own them in any way. You'd need a "client" side to display content, there is a minimalistic version of the code for this mentioned above.

## 🤔 What's Webnative?

[The Webnative SDK](https://github.com/fission-codes/webnative) empowers developers to build fully distributed web applications without needing a complex back-end. The SDK provides:

-   user accounts (via [the browser's Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)),
-   authorization (using [UCAN](https://ucan.xyz))
-   encrypted file storage (via the [Webnative File System](https://guide.fission.codes/developers/webnative/file-system-wnfs), backed by the [InterPlanetary File System](https://ipfs.io/), or IPFS)
-   and key management (via websockets and a two-factor auth-like flow).

Webnative applications work offline and store data encrypted for the user by leveraging the power of the web platform. You can read more about Webnative in Fission's [Webnative Guide](https://guide.fission.codes/developers/webnative).

## 📛 Usernames

When you go through the registration flow in WAT, the username you type in the form field has a `#{DID}` appended to it in the background. We did this to enable discord style usernames where users can share the same usernames, but have unique identifiers attached to the end to distinguish them from one another. We then create a hash of the `fullUsername`(the one with the `#{DID}` appended to the end) that is passed to Webnative. So Webnative only has a notion of the `hashed` username currently. This should also allow users to create usernames using emojis or non-English characters. Also, this is the only username schema that currently supports our File System recovery flow.
