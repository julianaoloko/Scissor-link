import LoginAccount from "../component/login"
// import Header from "../component/header"
export default function Page(){
    return(
        <div className="bg-slate-400 ">
            {/* <Header/> */}
            <div className="flex justify-center h-screen items-center">
            <LoginAccount/>
            </div>
        </div>
    )
}