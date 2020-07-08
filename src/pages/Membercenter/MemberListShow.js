import React, {  } from "react"
import MemberSideLink from "./MemberSideLink"
import MemberItem from "./MemberItem"
import MemberEditForm from "./MemberEditForm"

function MemberListShow(props) {
  const { member,setMember, isedit, setIsedit,handleEditedSave,ischangepwd, setIschangepwd,handleImgSave,localMember } = props
  return (
    <>
      <MemberSideLink>
        {isedit ? (
          <MemberEditForm
          member={member}
          setMember={setMember}
          isedit={isedit}
          setIsedit={setIsedit}
          handleEditedSave={handleEditedSave}
          handleImgSave={handleImgSave}
          localMember={localMember}
        />
        ) : (
          <MemberItem member={member} isedit={isedit} setIsedit={setIsedit} ischangepwd={ischangepwd}
          setIschangepwd={setIschangepwd} />
        )}
      </MemberSideLink>
    </>
  )
}
export default MemberListShow
