import {HomeClientLayout} from "@/pages/home-client-layout/HomeClientLayout";
import {StaticHomeContent} from "@/pages/static-home-content/ui/StaticHomeContent";

export default function HomePage() {
    return (
        <HomeClientLayout>
            <StaticHomeContent />
        </HomeClientLayout>
    )
}
