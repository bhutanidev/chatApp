const express = require('express');
const passport = require('passport');

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    const error = new Error('Not authenticated')
    console.log(error);
    return res.status(401).json({error:error.message})
  }

module.exports = authenticate
