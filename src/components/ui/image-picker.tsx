'use client';

import { ChangeEvent, useRef } from 'react';

import { Box, Flex } from '@radix-ui/themes';

import { Dialog, DialogClose, DialogContent, DialogTrigger } from './dialog';
import { Icons } from './icons';
import { Image } from './image';
import { Text } from './typo';

interface ImageSelectProps {
  image?: File | null; // Assuming it can be null initially
  setImage: (file: File | null) => void;
  accQR?: boolean;
  extraFunction?: (file: File) => {};
}

const ImagePicker: React.FC<ImageSelectProps> = ({
  image,
  setImage,
  accQR = false,
  extraFunction,
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      if (extraFunction) {
        extraFunction(files[0]);
      }
      setImage(files[0]);
    }
  };

  console.log(image);

  const formatFileSize = (sizeInBytes: number): string => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (sizeInBytes < kilobyte) {
      return sizeInBytes + ' B';
    } else if (sizeInBytes < megabyte) {
      return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else if (sizeInBytes < gigabyte) {
      return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    } else {
      return (sizeInBytes / gigabyte).toFixed(2) + ' GB';
    }
  };

  return (
    <Dialog>
      <Box className="border-2 border-dashed border-gray-500 py-6 rounded">
        <div
          onClick={() => {
            if (image == null) {
              if (imageRef.current) {
                imageRef.current.click();
              }
            }
          }}
        >
          {image ? (
            <Flex align="center" justify="between" className="px-6">
              <Flex className="flex-1">
                <DialogTrigger>
                  <Image
                    src={URL.createObjectURL(image)}
                    width={90}
                    height={100}
                    alt="Profile Image"
                    className="object-cover rounded-md w-[90px] h-[100px]"
                  />
                </DialogTrigger>
                <Box className="pl-[12px] pt-[5px]">
                  <Text className="text-sm font-semibold">
                    {' '}
                    {image.name.length > 20
                      ? `${image.name.slice(0, 20)}.${image.type.slice(6, image.type.length)}`
                      : image.name}
                  </Text>
                  <Text className="text-sm font-semibold pt-[10px]">
                    {formatFileSize(image.size)}
                  </Text>
                </Box>
              </Flex>
              <Icons.remove className="text-red-500" onClick={() => setImage(null)} />
            </Flex>
          ) : (
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap="3"
              className="w-full h-full"
            >
              <Flex align="center" gap="2" className="space-x-2 pb-5">
                <Image
                  src="/upload/icons/upload_icon.svg"
                  width={35}
                  height={25}
                  alt="uplaod icon"
                />
                <Text className=" text-sm font-semibold">Upload File Here</Text>
              </Flex>
              <Text className=" text-xs text-gray-400">Image Size : 382 x 215 (16:9)</Text>
              <Text className=" text-xs text-gray-400">Max File Size : 2MB</Text>
            </Flex>
          )}
        </div>
        <input
          ref={imageRef}
          type={'file'}
          multiple={false}
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={handleChangeFile}
        />
      </Box>
      <DialogContent>
        <Flex direction="column" align="center">
          <DialogClose className="w-full my-[10px]">
            <Flex align="center" justify="center" className="w-full">
              <Icons.close className="w-[30px] h-[30px]" />
            </Flex>
          </DialogClose>
          {image && (
            <div className="overflow-hidden">
              <Image
                src={URL.createObjectURL(image)}
                width={300} // Set fixed width
                height={300} // Set fixed height
                alt="Profile Image"
                className="rounded-md h-[550px] w-[300px]"
              />
            </div>
          )}
          <Box className="h-[10px]" />
        </Flex>
      </DialogContent>
    </Dialog>
  );
};
export default ImagePicker;
