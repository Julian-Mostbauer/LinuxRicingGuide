import { useRouter } from 'vue-router';
const router = useRouter();

const getAllPages = () => {
  const pages = router.getRoutes().map(route => route.path);
  console.log('All pages:', pages);
  return pages;
}

export default (inp: string) => {
  return 'Hello Util'
}
