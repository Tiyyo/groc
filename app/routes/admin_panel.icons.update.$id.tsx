import type { LoaderArgs } from "@remix-run/node";
import  { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getIconsById } from "~/api/get.one.by.id.request";
import Modal from "~/components/modal";

export async function loader({ params }: LoaderArgs) {
    const {id : iconId} = params
    try {
      if(iconId) {
        return json({ icon : await getIconsById(+iconId)});
      }
      throw new Error("No id provided");   
    } catch (error : any) {
        throw new Error(error.message);    
    }
  }
  
  export default function ModalUpdate() {
    const {UpdateForm} = useOutletContext<any>();
    const {icon} = useLoaderData()
  
    return (
      <Modal>
          <UpdateForm data={icon}/>
      </Modal>
    );
  }