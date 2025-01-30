import { createPinia} from 'pinia';

const piniaLocalStoragePlugin = ({ store }) => {
  const storedState = localStorage.getItem(store.$id);
  if (storedState) {
    store.$patch(JSON.parse(storedState)); 
  }

  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
};

export const pinia = createPinia();
pinia.use(piniaLocalStoragePlugin);
