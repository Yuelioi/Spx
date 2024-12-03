import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// 判断是否为管理员页面, 并且检测页面是否加载完毕
// 需要在router里传递params['show']
export function useAdminStatus() {
  const route = useRoute()
  const isAdmin = ref(false)
  const finish = ref(false)

  watch(
    route,
    () => {
      if (route.params && route.params['show']) {
        finish.value = true
        isAdmin.value = route.fullPath.startsWith('/admin')
      }
    },
    { immediate: true }
  )

  return { isAdmin, finish }
}
