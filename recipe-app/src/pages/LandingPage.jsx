import { Link } from "react-router-dom";
import { ChefHat, Search, Heart, Sparkles } from "lucide-react";
import "animate.css";
import "./LandingPage.css";
import chefImg from '../assets/chef-illustration.jpg';
import video from "../assets/food.mp4";
const LandingPage = () => {
  return (
    <div className="landing-page">
         {/* Hero Section */}
      <section className="landing-hero container">
        <div className="row align-items-center">
          <div className="col-md-6 text-section animate__animated animate__fadeInLeft">
            <h1>Your Recipe Buddy</h1>
            <p>
              Discover, plan, and save your favorite recipes using smart filters
              and wishlists. Explore global dishes effortlessly!
            </p>
            <Link to="/home" className="btn btn-primary mt-3">
              Get Started
            </Link>
          </div>

          <div className="col-md-6 animate__animated animate__zoomIn text-center">
            <img
              src={chefImg}
              alt="Chef Illustration"
              className="img-fluid hero-image"
            />
            
          </div>
          <video autoPlay muted loop playsInline className="background-video">
           <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
      </section>

      {/* Features */}
      <section className="container my-5 text-center animate__animated animate__fadeInUp">
        <h2 className="mb-4">Why Use Our App?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card p-4 shadow-sm">
              <Search size={36} className="mb-2 text-primary" />
              <h5>Smart Search</h5>
              <p>Find recipes by name, category, or ingredient instantly.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card p-4 shadow-sm">
              <Heart size={36} className="mb-2 text-danger" />
              <h5>Wishlist</h5>
              <p>Save your favorite meals and access them anytime.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card p-4 shadow-sm">
              <Sparkles size={36} className="mb-2 text-success" />
              <h5>Recipe Suggestions</h5>
              <p>
                Get recipe ideas using your ingredients or dietary preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta text-center py-5 bg-light animate__animated animate__fadeIn">
        <h3 className="mb-3">Start Exploring Delicious Recipes Today!</h3>
        <Link to="/home" className="btn btn-lg btn-outline-primary">
          Go to App
        </Link>
      </section>
      
    </div>
  );
};

export default LandingPage;
