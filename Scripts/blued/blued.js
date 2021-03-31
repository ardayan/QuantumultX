const cookieName = 'Blued'
const signurlKey = 'arda_signurl_blued'
const signheaderKey = 'arda_signheader_blued'
const signbodyKey = 'arda_signbody_blued'
const arda = init()
const signurlVal = arda.getdata(signurlKey)
const signheaderVal = arda.getdata(signheaderKey)

sign()

function sign() {

  const url = { url: signurlVal, headers: JSON.parse(signheaderVal)}
  arda.get(url, (error, response, data) => {
    const result = JSON.parse(data)
    let subTitle = ``
    let detail = ``
    const isSign = result.data.isSign
    const count = result.data.count
    if (isSign == true) {
      subTitle = `签到结果: 成功`
      detail = `连续签到${count}天`
    } else if (isSign == false) {
      subTitle = `签到结果: 失败`
    }
    arda.msg(cookieName, subTitle, detail)
    arda.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
