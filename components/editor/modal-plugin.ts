import type { BytemdPlugin } from 'bytemd';

export type ModalPluginOptions = {
  openModal: () => void;
  iconString: string;
  title: string;
};
export function modal({ openModal, iconString, title }: ModalPluginOptions): BytemdPlugin {
  return {
    actions: [
      {
        title,
        icon: iconString,
        handler: {
          type: 'action',
          click: () => openModal(),
        },
      },
    ],
  };
}
