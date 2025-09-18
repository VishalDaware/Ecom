import { Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">E-Comm</h2>
          <p className="text-gray-600 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div> 
        <div>
          <h3 className="font-bold mb-4">Follow Us</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Since the 1500s, when an unknown printer took a galley of type and scrambled.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-blue-600"><Facebook /></a>
            <a href="#" className="text-blue-400"><Twitter /></a>
          </div>
        </div>  
        <div>
          <h3 className="font-bold mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm">
            E-Comm, 4578 Marmora Road, Glasgow D04 89GR
          </p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-8">
          <FooterLinkColumn title="Information" links={['About Us', 'Infomation', 'Privacy Policy', 'Terms & Conditions']} />
          <FooterLinkColumn title="Service" links={['About Us', 'Infomation', 'Privacy Policy', 'Terms & Conditions']} />
          <FooterLinkColumn title="My Account" links={['About Us', 'Infomation', 'Privacy Policy', 'Terms & Conditions']} />
          <FooterLinkColumn title="Our Offers" links={['About Us', 'Infomation', 'Privacy Policy', 'Terms & Conditions']} />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 border-t pt-4 text-center text-gray-500">
        © 2025 E-Comm. All rights reserved.
      </div>
    </footer>
  );
};

const FooterLinkColumn = ({ title, links }: { title: string, links: string[] }) => (
  <div>
    <h3 className="font-bold mb-4">{title}</h3>
    <ul className="space-y-2 text-sm text-gray-600">
      {links.map(link => <li key={link}><a href="#" className="hover:underline">{link}</a></li>)}
    </ul>
  </div>
);