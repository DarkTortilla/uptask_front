import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProject, getProjects } from "../api/ProjectApi";

import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from "react-toastify";

export default function DashboardView() {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,

  })
  console.log(isError);
  console.log(data);
  
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn:deleteProject,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(d)=>{
      toast.success(d?.projectName || 'Project deleted successfully')
      queryClient.invalidateQueries({queryKey:['projects']})
    }
  })
  if (isLoading) return 'Cargando ...';


  if (data) return (
    <>
      <h1 className="text-5xl font-black">
        My Projects
      </h1>
      <p>Manage and administer your projects</p>

      <nav className="my-5">
        <Link className="bg-purple-400 hover:bg-purple-500
        px-10 py-3 text-white text-xl
        font-bold cursor-pointer transition-colors
      "
          to='/projects/create'
        >Create a new Project</Link>
      </nav>
      {data.length ?
        (





          <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {data.map((project) => (
              <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <Link to={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >{project.projectName}</Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                      >
                        <MenuItem>
                          <Link to={`/projects/${project._id}`}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                            Ver Proyecto
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to={`/projects/${project._id}/edit`}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                            Edit Project
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <button
                            type='button'
                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                            onClick={() => { mutate(project._id)}}
                          >
                            Delete Project
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>


        ) : (
          <p className="text-center py-20 ">No projects yet {''}
            <Link to='/projects/create'
              className="text-fuchsia-500 font-bold"
            >Create a project</Link>
          </p>

        )

      }


    </>
  )
}
