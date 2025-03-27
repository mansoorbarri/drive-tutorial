"use client"
import { useMemo, useState } from "react"
import { mockFiles, mockFolders } from "../lib/mock-data"
import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"

// Create these component types
interface FileType {
  id: string;
  name: string;
  parent: string;
  type: string;
  size: number;
}

interface FolderType {
  id: string;
  name: string;
  parent: string;
}

// Add FolderRow component
const FolderRow = ({ folder, handleFolderClick }: { folder: FolderType, handleFolderClick: () => void }) => (
  <li 
    onClick={handleFolderClick}
    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
  >
    <div className="col-span-6 flex items-center">
      <Folder className="mr-2 text-blue-400" size={20} />
      {folder.name}
    </div>
    <div className="col-span-3">Folder</div>
    <div className="col-span-3">-</div>
  </li>
)

// Add FileRow component
const FileRow = ({ file }: { file: FileType }) => (
  <li className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700">
    <div className="col-span-6 flex items-center">
      <FileIcon className="mr-2 text-gray-400" size={20} />
      {file.name}
    </div>
    <div className="col-span-3">{file.type}</div>
    <div className="col-span-3">{file.size} KB</div>
  </li>
)

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root")

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder)
  }

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  const getBreadcrumbs = useMemo(() => {
    const breadcrumbs: FolderType[] = []
    let currentId: string | null = currentFolderl

    while (currentId !== "root") {
      const folder = mockFolders.find((folder) => folder.id === currentId)
      if (folder) {
        breadcrumbs.unshift(folder)
        currentId = folder.parent ?? "root"
      } else {
        break
      }
    }

    return breadcrumbs
  }, [currentFolder])

  const handleUpload = () => {
    alert("Upload functionality would be implemented here")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder("root")}
              variant="ghost"
              className="text-gray-300 hover:text-white mr-2"
            >
              My Drive
            </Button>
            {getBreadcrumbs.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload} className="bg-blue-600 text-white hover:bg-blue-700">
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {getCurrentFolders().map((folder) => (
              <FolderRow 
                key={folder.id} 
                folder={folder} 
                handleFolderClick={() => handleFolderClick(folder.id)} 
              />
            ))}
            {getCurrentFiles().map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}