const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const helmet = require('helmet');
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000"],
    },
  })
);

app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


// read
app.get('/to_do_list', async (req, res) => {

  let { data, error } = await supabase
    .from('to_do_list')
    .select('*');

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});


// get by id
app.get('/to_do_list/:id', async (req, res) => {
  const { id } = req.params;
  let { data, error } = await supabase
    .from('to_do_list')
    .select('*')
    .eq('id', id);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
}
);


// create
app.post('/insert-to_do_list', async (req, res) => {
  console.log(req.body);
  // Insert or upsert the data into the 'countries' table
  const { error } = await supabase
    .from('to_do_list')
    .insert(
      {
        title: req.body.title,
        note: req.body.note,
        isCompleted: req.body.isCompleted, // jadi null
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        color: req.body.color
      }
    );

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // res.status(200).json({ data });
});


// delete
app.delete('/delete-to_do_list/:id', async (req, res) => {
  const { id } = req.params;

  // Delete the data from the 'countries' table
  const { error } = await supabase
    .from('to_do_list')
    .delete()
    .eq('id', id);


  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Deleted successfully' });
}
);
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
}
);

// update task
app.put('/update-to_do_list/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('to_do_list')
    .update({
      title: req.body.title,
      note: req.body.note,
      isCompleted: req.body.isCompleted, 
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      color: req.body.color
    })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Updated successfully' });
}
);


// // update
// // set isCompleted to true
// app.put('/update-to_do_list/:id', async (req, res) => {
//   const { id } = req.params;

//   // Update the data in the 'countries' table
//   const { error } = await supabase
//     .from('to_do_list')
//     .update({ isCompleted: true })
//     .eq('id', id);

//   if (error) {
//     return res.status(400).json({ error: error.message });
//   }

//   res.status(200).json({ message: 'Updated successfully' });
// }
// );

// Start server
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});