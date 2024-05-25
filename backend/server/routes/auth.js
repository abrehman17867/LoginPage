const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user && user.password === password) {
      return res.status(200).send({ message: 'User already exists' });
    }

    if (!user) {
      user = new User({ email, password });
      await user.save();
    }

    const pdfPath = path.join(__dirname, '..', 'logins.pdf');
    const isNewFile = !fs.existsSync(pdfPath);

    const doc = new PDFDocument();

    // Create or append to the PDF file
    const pdfStream = fs.createWriteStream(pdfPath, { flags: 'a' });
    doc.pipe(pdfStream);

    // If it's a new file, add table headers
    if (isNewFile) {
      doc.font('Helvetica-Bold').fontSize(12);
      doc.text('No.', 50, 50);
      doc.text('Email', 150, 50);
      doc.text('Password', 300, 50);
    }

    // Fetch all existing users from the database
    const existingUsers = await User.find();

    // Write existing user data to the PDF
    if (existingUsers.length > 0) {
      let yPos = isNewFile ? 80 : doc.y + 20;
      existingUsers.forEach((user, index) => {
        doc.font('Helvetica').fontSize(12);
        doc.text((index + 1).toString(), 50, yPos);
        doc.text(user.email, 150, yPos);
        doc.text(user.password, 300, yPos);
        yPos += 20;
      });
    }

    // Add the new login attempt to the PDF
    
    // const yPos = isNewFile ? 80 + existingUsers.length * 20 : doc.y + 20;
    // doc.font('Helvetica').fontSize(12);
    // doc.text((existingUsers.length + 1).toString(), 50, yPos);
    // doc.text(email, 150, yPos);
    // doc.text(password, 300, yPos);

    doc.end();

    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
