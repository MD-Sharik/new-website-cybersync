import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  image: { type: String },
  author: { type: String, default: 'Admin' },
  category: { type: String, default: 'General' },
  slug: { type: String },
  date: { type: Date, default: Date.now }
});

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  subscribedAt: { type: Date, default: Date.now }
});

// Check if models already exist to prevent overwriting
let Blog, Subscriber;

try {
  Blog = mongoose.model('Blog', blogSchema);
} catch (err) {
  Blog = mongoose.model('Blog');
}

try {
  Subscriber = mongoose.model('Subscriber', subscriberSchema);
} catch (err) {
  Subscriber = mongoose.model('Subscriber');
}

export async function connectDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

export async function getAllBlogs() {
  try {
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    // Map _id to id for frontend compatibility
    return blogs.map(blog => ({
      ...blog,
      id: blog._id.toString()
    }));
  } catch (err) {
    console.error('Error fetching blogs:', err);
    return [];
  }
}

export async function addBlog({ title, content, image, author, category }) {
  try {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const excerpt = content.slice(0, 160) + '...';
    
    const blog = new Blog({
      title,
      content,
      excerpt,
      image: image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      author: author || 'Admin',
      category: category || 'General',
      slug
    });
    
    await blog.save();
    console.log('Blog saved successfully:', blog._id);
    return blog;
  } catch (err) {
    console.error('Error adding blog:', err);
    throw err;
  }
}

export async function subscribeEmail(email) {
  try {
    console.log('Subscribing email:', email);
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase(), subscribedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log('Email subscribed successfully:', subscriber.email);
    return subscriber;
  } catch (err) {
    console.error('Error subscribing email:', err);
    throw err;
  }
}

export async function getAllSubscribers() {
  try {
    const subscribers = await Subscriber.find().lean();
    console.log('Total subscribers:', subscribers.length);
    return subscribers.map(sub => sub.email);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    return [];
  }
}

export async function getBlogById(id) {
  try {
    if (!id || id === 'undefined') {
      return null;
    }
    const blog = await Blog.findById(id).lean();
    if (blog) {
      return {
        ...blog,
        id: blog._id.toString()
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching blog by id:', err);
    return null;
  }
}
