// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Todo{
    struct Task{
        uint id;
        string task;
        bool isDeleted;
    }
    Task[] private tasks;
    mapping(uint=>address) taskOwner;

    event AddTask(address recipient,uint taskId);
    event DeleteTask(uint taskId,bool isDeleted);

    function addTask(string memory ntask)public {
        uint tid=tasks.length;
        tasks.push(Task(tid,ntask,false));
        taskOwner[tid]=msg.sender;
        emit AddTask(msg.sender, tid);
    }

    function deleteTask(uint taskId)external{
        require(taskOwner[taskId]==msg.sender);
        tasks[taskId].isDeleted=true;
        emit DeleteTask(taskId, true);
    }
    function getTask()external view returns(Task[] memory){
        Task[] memory temp=new Task[](tasks.length);
        uint count=0;
        for(uint i=0;i<tasks.length;i++){
            if(taskOwner[i]==msg.sender && !tasks[i].isDeleted){
                temp[count++]=tasks[i];
            }
        }
        Task[] memory ans=new Task[](count);
        for(uint i=0;i<count;i++){
            ans[i]=temp[i];
        }
        return ans;
    }
}