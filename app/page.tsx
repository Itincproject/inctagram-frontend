import { StaticHomeContent } from '@/pages/static-home-content/ui'
import {HomeClientLayout} from "@/pages/home-client-layout/HomeClientLayout";

export default function HomePage() {
    return (
        <HomeClientLayout>
            <StaticHomeContent />
        </HomeClientLayout>
    )
}
