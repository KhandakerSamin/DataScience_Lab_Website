

import Banner from "@/components/ContactUsPage/banner"
import ContactField from "@/components/ContactUsPage/ContactField"

export const metadata = {
  title: "DIU | Contact Us",
  description: "Get in touch with the Data Science Lab of Daffodil International University",
};


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <ContactField />
    </div>
  )
}
