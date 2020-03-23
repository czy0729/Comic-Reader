/*
 * @Author: czy0729
 * @Date: 2020-03-23 16:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-23 17:17:10
 */
var LZString = (function() {
  var f = String.fromCharCode
  var keyStrBase64 =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var baseReverseDic = {}
  function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
      baseReverseDic[alphabet] = {}
      for (var i = 0; i < alphabet.length; i++) {
        baseReverseDic[alphabet][alphabet.charAt(i)] = i
      }
    }
    return baseReverseDic[alphabet][character]
  }
  var LZString = {
    decompressFromBase64: function(input) {
      if (input == null) {
        return ''
      }
      if (input == '') {
        return null
      }
      return LZString._0(input.length, 32, function(index) {
        return getBaseValue(keyStrBase64, input.charAt(index))
      })
    },
    _0: function(length, resetValue, getNextValue) {
      var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = '',
        result = [],
        i,
        w,
        bits,
        resb,
        maxpower,
        power,
        c,
        data = { val: getNextValue(0), position: resetValue, index: 1 }
      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i
      }
      bits = 0
      maxpower = Math.pow(2, 2)
      power = 1
      while (power != maxpower) {
        resb = data.val & data.position
        data.position >>= 1
        if (data.position == 0) {
          data.position = resetValue
          data.val = getNextValue(data.index++)
        }
        bits |= (resb > 0 ? 1 : 0) * power
        power <<= 1
      }
      switch ((next = bits)) {
        case 0:
          bits = 0
          maxpower = Math.pow(2, 8)
          power = 1
          while (power != maxpower) {
            resb = data.val & data.position
            data.position >>= 1
            if (data.position == 0) {
              data.position = resetValue
              data.val = getNextValue(data.index++)
            }
            bits |= (resb > 0 ? 1 : 0) * power
            power <<= 1
          }
          c = f(bits)
          break
        case 1:
          bits = 0
          maxpower = Math.pow(2, 16)
          power = 1
          while (power != maxpower) {
            resb = data.val & data.position
            data.position >>= 1
            if (data.position == 0) {
              data.position = resetValue
              data.val = getNextValue(data.index++)
            }
            bits |= (resb > 0 ? 1 : 0) * power
            power <<= 1
          }
          c = f(bits)
          break
        case 2:
          return ''
      }
      dictionary[3] = c
      w = c
      result.push(c)
      while (true) {
        if (data.index > length) {
          return ''
        }
        bits = 0
        maxpower = Math.pow(2, numBits)
        power = 1
        while (power != maxpower) {
          resb = data.val & data.position
          data.position >>= 1
          if (data.position == 0) {
            data.position = resetValue
            data.val = getNextValue(data.index++)
          }
          bits |= (resb > 0 ? 1 : 0) * power
          power <<= 1
        }
        switch ((c = bits)) {
          case 0:
            bits = 0
            maxpower = Math.pow(2, 8)
            power = 1
            while (power != maxpower) {
              resb = data.val & data.position
              data.position >>= 1
              if (data.position == 0) {
                data.position = resetValue
                data.val = getNextValue(data.index++)
              }
              bits |= (resb > 0 ? 1 : 0) * power
              power <<= 1
            }
            dictionary[dictSize++] = f(bits)
            c = dictSize - 1
            enlargeIn--
            break
          case 1:
            bits = 0
            maxpower = Math.pow(2, 16)
            power = 1
            while (power != maxpower) {
              resb = data.val & data.position
              data.position >>= 1
              if (data.position == 0) {
                data.position = resetValue
                data.val = getNextValue(data.index++)
              }
              bits |= (resb > 0 ? 1 : 0) * power
              power <<= 1
            }
            dictionary[dictSize++] = f(bits)
            c = dictSize - 1
            enlargeIn--
            break
          case 2:
            return result.join('')
        }
        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits)
          numBits++
        }
        if (dictionary[c]) {
          entry = dictionary[c]
        } else {
          if (c === dictSize) {
            entry = w + w.charAt(0)
          } else {
            return null
          }
        }
        result.push(entry)
        dictionary[dictSize++] = w + entry.charAt(0)
        enlargeIn--
        w = entry
        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits)
          numBits++
        }
      }
    }
  }
  return LZString
})()
String.prototype.splic = function(f) {
  return LZString.decompressFromBase64(this).split(f)
}

var a = (function(p, a, c, k, e, d) {
  e = function(c) {
    return (
      (c < a ? '' : e(parseInt(c / a))) +
      ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    )
  }
  if (!''.replace(/^/, String)) {
    while (c--) d[e(c)] = k[c] || e(c)
    k = [
      function(e) {
        return d[e]
      }
    ]
    e = function() {
      return '\\w+'
    }
    c = 1
  }
  while (c--)
    if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
  return p
})(
  'q.o({"p":E,"D":"F","y":C,"t":"a","B":A,"x":0,"G":["/g/z/i/a/%c%h%e%b%k%j%l(1).f.d","/g/z/i/a/%c%h%e%b%k%j%l(2).f.d","/g/z/i/a/%c%h%e%b%k%j%l(3).f.d","/g/z/i/a/%c%h%e%b%k%j%l(4).f.d","/g/z/i/a/%c%h%e%b%k%j%l(5).f.d","/g/z/i/a/%c%h%e%b%k%j%l(6).f.d","/g/z/i/a/%c%h%e%b%k%j%l(7).f.d","/g/z/i/a/%c%h%e%b%k%j%l(8).f.d","/g/z/i/a/%c%h%e%b%k%j%l(9).f.d","/g/z/i/a/%c%h%e%b%k%j%l(H).f.d","/g/z/i/a/%c%h%e%b%k%j%l(w).f.d","/g/z/i/a/%c%h%e%b%k%j%l(r).f.d","/g/z/i/a/%c%h%e%b%k%j%l(u).f.d","/g/z/i/a/%c%h%e%b%k%j%l(v).f.d","/g/z/i/a/%c%h%e%b%k%j%l(s).f.d","/g/z/i/a/%c%h%e%b%k%j%l(W).f.d","/g/z/i/a/%c%m%V%n%m%U%c%h%e%b%X%M%n%N%I%b%J%K.f.d"],"R":S,"T":1,"O":"","P":{"Q":"L"}}).Y();',
  61,
  61,
  'D41w03gDAjIe2rAUQOyIGzAO4FMBGAHYADkOACs8BzYPAZ2mAE4BhYAL1IDsBPLgFwA9SAfRq8aXYACFIjACzAATDMKTEAVmAAnLAEMAJlk3AcAexMBrAJJ7gAZQCyACWDQFLjQGMAFjry9DACoAlrwANlguAMwu8tD0eNoAbtbA3r7+minAkWoMMCQcWPy8KTl50CimFgByOgC2EQpIsk3AgPuegPgKgM6agNPKgBDmgAyugPA6gAuawEF1OhRYNC4yDPSSqoSy9IlKGF5IQXqsAK5xJnXVABoAgjoAZkwAIgCKRNEMN8ahJh7mQh4ewDShwHU9J4THsOLwXChRDpeHtZgwAGKMVTQdB5ajaSwcEJAA'[
    '\x73\x70\x6c\x69\x63'
  ]('\x7c'),
  0,
  {}
)

var b = JSON.parse(a.replace(/^[^(]*\(|\)\.[^.]*$/g, ''))

var c = b.images.map(
  item => `https://i.hamreus.com${item}?cid=${b.chapterId}&md5=${b.sl.md5}`
)
