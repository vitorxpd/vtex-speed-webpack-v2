const url = require('url')

const { accountName } = require('../package.json')

const ignoreReplace = [
  /\.js(\?.*)?$/,
  /\.css(\?.*)?$/,
  /\.svg(\?.*)?$/,
  /\.ico(\?.*)?$/,
  /\.woff(\?.*)?$/,
  /\.png(\?.*)?$/,
  /\.jpg(\?.*)?$/,
  /\.jpeg(\?.*)?$/,
  /\.gif(\?.*)?$/,
  /\.pdf(\?.*)?$/,
]

function rewriteLocation(location) {
  return location.replace(
    `${accountName}.myvtex.com`,
    `${accountName}.vtexlocal.com.br`
  )
}

function setBody(req, res, next) {
  const isIgnore = ignoreReplace.some((ignore) => {
    return ignore.test(req.url)
  })

  if (isIgnore) {
    return next()
  }

  let data, end, proxiedHeaders, proxiedStatusCode, write, writeHead

  data = ''
  write = res.write
  end = res.end
  writeHead = res.writeHead
  proxiedStatusCode = null
  proxiedHeaders = null

  res.writeHead = (statusCode, headers) => {
    proxiedStatusCode = statusCode
    return (proxiedHeaders = headers)
  }

  res.write = (chunk) => {
    return (data += chunk)
  }
  res.end = (chunk, encoding) => {
    if (chunk) {
      data += chunk
    }

    if (data) {
      data = data.replace(/vtexcommercestable/g, 'vtexlocal')
      data = data.replace(/vteximg/g, 'vtexlocal')
    }

    res.write = write
    res.end = end
    res.writeHead = writeHead

    if (proxiedStatusCode && proxiedHeaders) {
      proxiedHeaders['content-length'] = Buffer.byteLength(data)

      delete proxiedHeaders['content-security-policy']

      res.writeHead(proxiedStatusCode, proxiedHeaders)
    }

    return res.end(data, encoding)
  }

  next()
}

function setCompression(req, res, next) {
  req.headers['accept-encoding'] = 'identity'
  next()
}

function setHeaders(req, res, next) {
  let writeHead = res.writeHead

  res.writeHead = (statusCode, headers) => {
    if (headers && headers.location) {
      headers.location = rewriteLocation(headers.location)
    }

    res.writeHead = writeHead

    return res.writeHead(statusCode, headers)
  }

  next()
}

function setHost(req, res, next) {
  req.headers.host = `${accountName}.myvtex.com`
  next()
}

function proxyConfig() {
  const _HOST = `${accountName}.myvtex.com`
  const PROXY_CONFIG = url.parse(`https://${_HOST}/`)

  PROXY_CONFIG.preserveHost = true
  PROXY_CONFIG.cookieRewrite = `${accountName}.vtexlocal.com.br`

  return PROXY_CONFIG
}

module.exports = {
  setHeaders,
  setHost,
  setCompression,
  setBody,
  proxyConfig,
}
