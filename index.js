const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Example route to get data
app.get('/users', async (req, res) => {
  let { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.get('/to_do_list', async (req, res) => {
    console.log("to_do_list");
  let { data, error } = await supabase
    .from('to_do_list')
    .select('*');
    console.log("to_do_list");
    console.log(data);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
  console.log(res);
});

// Start server
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
