import { ArrowDownOnSquareIcon ,ArrowUpOnSquareIcon} from '@heroicons/react/20/solid'
import Footer from './footer'
import AnimatedBackground from './animatedBackground'
import { useServices } from '../services/ServiceContext'

const features = [
  {
    name: 'Vision',
    description:
      'The Lions Clud of Veyangoda Vangauard envisions a compassionate community where positive change is catalyzed through innovative initiatives and collaborative efforts',
    icon: ArrowDownOnSquareIcon,
  },
  {
    name: 'Mission',
    description: 'Our mission venters on creating a community servise hub that provides unwavering support, access to opportunities, and meets iverse needs through communuty service',
    icon: ArrowUpOnSquareIcon,
  },
]
const Home = () =>{
  const { userStateService} = useServices()
  const {state, dispatch} = userStateService
    return(
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* <div className="h-screen bg-gray-200 relative ">
          <AnimatedBackground/>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Lions Club of Veyangoda Vanguard
          </h1>
        </div> */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
          >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              />
        </div>
        <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-20">
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{' '}
            <a href="#" className="font-semibold text-indigo-600">
            <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
                </a>
                </div>
                </div> */}
                
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Lions Clud of Veyangoda Vangard
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {'user name is ' + state.USER_NAME}
            </h1> 
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to the Lions Club of Veyangoda Vanguard, where community service meets dedication and innovation. As a local chapter of the global Lions Clubs International, our mission is to lead positive change within the global community. Through a spirit of volunteerism and a commitment to service, we strive to be at the forefront of initiatives that uplift and empower our community. Join us as we work together to make a lasting impact, embodying the principles of Lions Clubs in our pursuit of a better, brighter future for all..
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Read More... <span aria-hidden="true">→</span>
              </a>
              {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
                </a> */}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
          >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              />
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature,index) => (
              <div className='flex m-20' key={index} >
                <div key={feature.name} className="bg-yellow-400 m rounded-lg p-4 mb-1 text-center mx-auto  py-10">
                  <dt className="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl flex items-center justify-center pb-10 ">
                    
                    <feature.icon className="right-0 top-0 mt-0.5 mr-10 h-10 w-10 text-gray-900 " aria-hidden="true" />
                    {feature.name}
                  </dt>{' '}
                  <div className='rounded-lg border-4 border-white p-4 flex'>
                    <dd className="inline ml-1 text-gray-1000 leading-8 ">{feature.description}</dd>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Footer/>     
        </div>
      </div>
    )
    }
    export default Home
    
    
    
    
    
    
    
    
    // export default function Home() {
//   return (
  //     <div className="overflow-hidden bg-white py-24 sm:py-32">
  //       <div className="mx-auto max-w-7xl px-6 lg:px-8">
  //         <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
  //           <div className="lg:pr-8 lg:pt-4">
//             <div className="lg:max-w-lg">
//               <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
//               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
//               <p className="mt-6 text-lg leading-8 text-gray-600">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
//                 iste dolor cupiditate blanditiis ratione.
//               </p>
//               <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"> 
//                 {features.map((feature) => (
//                   <div key={feature.name} className="relative pl-9">
//                     <dt className="inline font-semibold text-gray-900">
//                       <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
//                       {feature.name}
//                     </dt>{' '}
//                     <dd className="inline">{feature.description}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>
//           </div>
//           <img
//             src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
//             alt="Product screenshot"
//             className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
//             width={2432}
//             height={1442}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }
