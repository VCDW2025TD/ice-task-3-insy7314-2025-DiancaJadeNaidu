const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://diancanaidu:CNPuE7Zry6reZycS@cluster0.bk2ea7l.mongodb.net/atlasadmin?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connection successful');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });
