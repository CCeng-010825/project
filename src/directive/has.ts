import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
// console.log(userStore)
export const isHasButton = (app: any) => {
  app.directive('hhh', {
    mounted(el: any, options: any) {
      //   console.log(el)
      //   console.log(options)
      //   console.log(userStore.buttons)
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
        // console.log(111)
      }
    },
  })
}
