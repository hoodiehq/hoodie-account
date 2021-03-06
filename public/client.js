/* global hoodie */
'use strict'

// Account instance for hoodie-account-client
var account = hoodie.account

var actions = {
  login: function login () {
    var username = document.querySelector('input[id="login-username-field"]').value
    var password = document.querySelector('input[id="login-password-field"]').value
    return account.signIn({ username: username, password: password })
  },
  register: function register () {
    var username = document.querySelector('input[id="register-username-field"]').value
    var password = document.querySelector('input[id="register-password-field"]').value
    return account.signUp({ username: username, password: password })
  },
  reset: function reset () {
    var contact = document.querySelector('input[id="reset-email-field"]').value
    return account.request({ type: 'passwordreset', contact: contact })
  },
  update: function update () {
    var username = document.querySelector('input[id="update-username-field"]').value
    var password = document.querySelector('input[id="update-password-field"]').value
    if (password === '') {
      return account.update({ username: username })
    } else {
      return account.update({ username: username, password: password })
    }
  },
  logout: function logout () {
    return account.signOut()
  },
  destroy: function destroy () {
    return account.destroy()
  }
}

// Event Listener for Actions
document.querySelector('body').addEventListener('click', function (event) {
  document.querySelectorAll('.messages').forEach(function (node) {
    node.innerHTML = ''
  })
  if (actions[event.target.id] !== undefined) {
    actions[event.target.id]().then(function (r) {
      if (event.target.id === 'login') {
        document.querySelectorAll('.input-forms').forEach(function (node) {
          return node.setAttribute('data-hide', 'true')
        })
        document.querySelectorAll('.profile-forms').forEach(function (node) {
          return node.setAttribute('data-hide', 'false')
        })
      } else if (event.target.id === 'register') {
        var node = document.querySelector('#register-response')
        node.style.color = 'green'
        node.innerHTML = 'Successfully Registration: Please sign in to access profile settings'
      } else if (event.target.id === 'destroy' || event.target.id === 'logout') {
        document.querySelectorAll('.profile-forms').forEach(function (node) {
          return node.setAttribute('data-hide', 'true')
        })
        document.querySelectorAll('.input-forms').forEach(function (node) {
          return node.setAttribute('data-hide', 'false')
        })
      } else if (event.target.id === 'update') {
        var _node = document.querySelector('#update-response')
        _node.style.color = 'green'
        _node.innerHTML = 'Successful Updation'
      }
    }).catch(function (e) {
      if (event.target.id === 'login') {
        var node = document.querySelector('#login-response')
        node.style.color = 'red'
        node.innerHTML = e
      } else if (event.target.id === 'register') {
        var _node2 = document.querySelector('#register-response')
        _node2.style.color = 'red'
        _node2.innerHTML = e
      } else if (event.target.id === 'reset') {
        var _node3 = document.querySelector('#password-reset-response')
        _node3.style.color = 'red'
        _node3.innerHTML = e
      }
    })
  }
})

// Client Rendering Logic
if (account.isSignedIn()) {
  document.querySelector('.generic-loader-wrap').setAttribute('data-hide', 'true')
  document.querySelectorAll('.profile-forms').forEach(function (node) {
    return node.setAttribute('data-hide', 'false')
  })
} else {
  document.querySelector('.generic-loader-wrap').setAttribute('data-hide', 'true')
  document.querySelectorAll('.input-forms').forEach(function (node) {
    return node.setAttribute('data-hide', 'false')
  })
}
