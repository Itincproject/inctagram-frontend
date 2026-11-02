import {RootState} from "@/app/providers/store";
import {useSelector} from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>()