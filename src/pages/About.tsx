import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface StorySection {
  title: string;
  content: string[];
}

interface ValueCard {
  title: string;
  description: string;
}

const About: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [storyContent, setStoryContent] = useState<StorySection>({
    title: "",
    content: [],
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<ValueCard[]>([]);

  // Simulate API fetch for dynamic content
  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Simulated API response
      const aboutData = {
        story: {
          title: "Our Story",
          content: [
            "Thiya's Boutique began as a small boutique in the heart of the fashion district, founded by two friends with a shared vision for accessible luxury and timeless style.",
            "Over the years, we've grown into a global brand while maintaining our commitment to craftsmanship, ethical production, and personalized customer experiences.",
            "Today, Thiya's Boutique continues to push boundaries in sustainable fashion, working with artisans and designers who share our passion for quality and innovation.",
          ],
        },
        values: [
          {
            title: "Sustainability",
            description:
              "We're committed to reducing our environmental footprint through ethical sourcing, eco-friendly materials, and sustainable practices across our supply chain.",
          },
          {
            title: "Quality Craftsmanship",
            description:
              "Each product is crafted with meticulous attention to detail, ensuring durability and timeless style that transcends seasonal trends.",
          },
          {
            title: "Inclusive Fashion",
            description:
              "We believe luxury should be accessible to all. We design for diverse body types, styles, and occasions, celebrating individuality.",
          },
        ],
        team: [
          {
            name: "Alex Morgan",
            position: "Founder & CEO",
            image: "/placeholder.svg",
          },
          {
            name: "Jamie Taylor",
            position: "Creative Director",
            image: "/placeholder.svg",
          },
          {
            name: "Casey Johnson",
            position: "Head of Operations",
            image: "/placeholder.svg",
          },
          {
            name: "Riley Smith",
            position: "Lead Designer",
            image: "/placeholder.svg",
          },
        ],
      };

      setStoryContent(aboutData.story);
      setValues(aboutData.values);
      setTeamMembers(aboutData.team);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Layout
      title="About Us | Thiya's Boutique"
      description="Learn about Thiya's Boutique, our story, mission, and commitment to quality fashion."
      canonical="/about"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Thiya's Boutique</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crafting premium fashion experiences since 2015. Discover our story
            of passion, craftsmanship, and commitment to sustainable luxury.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-3/4 mb-6" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-20 w-5/6" />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  {storyContent.title}
                </h2>
                {storyContent.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </>
            )}
          </div>
          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Founder Image Placeholder</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {isLoading
              ? Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <Skeleton className="h-6 w-1/2 mb-3" />
                        <Skeleton className="h-24 w-full" />
                      </CardContent>
                    </Card>
                  ))
              : values.map((value, index) => (
                  <Card
                    key={index}
                    className="transition-all duration-300 hover:shadow-md"
                  >
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {isLoading
              ? Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="text-center">
                      <Skeleton className="h-64 w-full rounded-lg mb-4" />
                      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
                      <Skeleton className="h-4 w-1/3 mx-auto" />
                    </div>
                  ))
              : teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                      <p className="text-gray-400">{member.name}</p>
                    </div>
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 py-16 px-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Experience the Thiya's Boutique difference today and become part of our growing
            community of fashion enthusiasts and conscious consumers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="bg-boutique-600 text-white px-8 py-3 rounded-md hover:bg-boutique-700 transition-colors"
            >
              Shop Collection
            </a>
            <a
              href="/contact"
              className="border border-boutique-600 text-boutique-600 px-8 py-3 rounded-md hover:bg-boutique-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
