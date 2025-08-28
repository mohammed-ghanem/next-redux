import Categories from "@/components/categories/Categories";
import HomeCarousel from "@/components/homeCarousel/HomeCarousel";
import CircelSlider from "@/components/test/Test";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <>

      <HomeCarousel />

      <div>welcome homeee</div>
      <div>welcome homeee</div>
      <div>welcome homeee</div>
      <div>welcome homeee</div>
      <div>welcome homeee</div>
      <div>welcome homeee</div>


      <CircelSlider />

      <Camera color="red" size={48} />
      <Categories />
    </>
  );
}

