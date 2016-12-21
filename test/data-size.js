import hub from '../lib'
import test from 'tape'

var server, client

test('data size', { timeout: 2000 }, t => {
  server = hub({
    key: 'server',
    id: 'server',
    port: 6000
  })

  client = hub({
    key: 'client',
    id: 'client',
    url: 'ws://localhost:6000',
    context: false
  })

  var someData = {}
  const val = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
    'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
    'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  let i = 1e3
  while (i-- > 0) {
    const d = 1e11 + Math.round(Math.random() * 1e11)
    someData[`key-${d}-longer-string-${d}`] = {
      keyOne: { subKeyOne: val, subKeyTwo: val },
      keyTwo: { subKeyOne: val, subKeyTwo: val },
      keyThree: { subKeyOne: val, subKeyTwo: val },
      keyFour: { subKeyOne: val, subKeyTwo: val },
      keyFive: { subKeyOne: val, subKeyTwo: val }
    }
  }

  server.set({ someData })


  client.subscribe({ someData: { val: true } }, () => {
    t.ok(true, 'subscription fired')
    t.end()
  })
})

test('reset', t => {
  client.set(null)
  server.set(null)
  t.end()
})
