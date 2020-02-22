pragma solidity >=0.5.11;

contract dAudit
{   
    struct accountHolder
    {
        address add;
        int bal;
        string[] reciept ;
    }

    accountHolder universityHead;
    accountHolder collegeHead;
    accountHolder culturalHead;
    accountHolder academicsHead;
    accountHolder sportsHead;
    accountHolder maintenanceHead;
    mapping(string => accountHolder) getAccount;

    constructor() public
    {
        universityHead.add = 0x2EE4BEf611eeDFe1822169Bdcb18247CC27BbbcE;
        universityHead.bal = 0;
        getAccount["university"] = universityHead;

        collegeHead.add = 0xc10FDEA8aEA67Fee221FE47b4f0A1703cbB5D491;
        collegeHead.bal = 0;
        getAccount["college"] = collegeHead;
        
        culturalHead.add = 0x443D7a509A5859BE26fD5E2e60feC30d7E6f3AdF;
        culturalHead.bal = 0;
        getAccount["cultural"] = culturalHead;
        
        academicsHead.add = 0x22f5B24222210B8ef09c21E563EA861253211979;
        academicsHead.bal = 0;
        getAccount["academics"] = academicsHead;

        sportsHead.add = 0x125F479933386d714d747274081365275CF9e691;
        sportsHead.bal = 0;
        getAccount["sports"] = sportsHead;

        maintenanceHead.add = 0xc7891Fd521378917C5E373bD16c96C2050BAC25a;
        maintenanceHead.bal = 0;
        getAccount["maintenance"] = maintenanceHead;
    }

    function unitocol(string memory rec1, string memory rec2,int amt) public
    {
        require(msg.sender == universityHead.add,"Sender not authorised");
        accountHolder storage uni = getAccount["university"];
        accountHolder storage col = getAccount["college"];
        uni.bal += amt;
        col.bal += amt;
        uni.reciept.push(rec1);
        col.reciept.push(rec2);
    }

    function coltoacd(string memory rec1, string memory rec2,int amt) public
    {
        require(msg.sender == collegeHead.add,"Sender not authorised");
        accountHolder storage acd = getAccount["academics"];
        accountHolder storage col = getAccount["college"];
        acd.bal += amt;
        col.bal -= amt;
        col.reciept.push(rec1);
        acd.reciept.push(rec2);
        
    }

    function coltospt(string memory rec1, string memory rec2,int amt) public
    {
        require(msg.sender == collegeHead.add,"Sender not authorised");
        accountHolder storage spt = getAccount["sports"];
        accountHolder storage col = getAccount["college"];
        spt.bal += amt;
        col.bal -= amt;
        col.reciept.push(rec1);
        spt.reciept.push(rec2);
        
    }
    function coltomnt(string memory rec1, string memory rec2,int amt) public
    {
        require(msg.sender == collegeHead.add,"Sender not authorised");
        accountHolder storage mnt = getAccount["maintenance"];
        accountHolder storage col = getAccount["college"];
        mnt.bal += amt;
        col.bal -= amt;
        col.reciept.push(rec1);
        mnt.reciept.push(rec2);
        
    }
    function coltocul(string memory rec1, string memory rec2,int amt) public
    {
        require(msg.sender == collegeHead.add,"Sender not authorised");
        accountHolder storage cul = getAccount["cultural"];
        accountHolder storage col = getAccount["college"];
        cul.bal += amt;
        col.bal -= amt;
        col.reciept.push(rec1);
        cul.reciept.push(rec2);
        
    }

    function getBalance (string memory add) public view returns(int)
    {
        accountHolder storage acc = getAccount[add];
        return acc.bal;
    }

    function getReciept (string memory acc,uint index) public view returns(string memory)
    {
        string memory rec = getAccount[acc].reciept[index];
        return rec;
    }

    function getCount (string memory acc) public view returns(uint)
    {
        uint len = (getAccount[acc].reciept).length;
        return len;
    }
    
    function checkUser (address user) public view returns(string memory)
    {
        string memory res;

        if(user==universityHead.add)
            res = "university";
        else if(user==collegeHead.add)
            res = "college";
        else if(user==culturalHead.add)
            res = "cultural";
        else if(user==academicsHead.add)
            res = "academics";
        else if(user==sportsHead.add)
            res = "sports";
        else if(user==maintenanceHead.add)
            res = "maintenance";
        else
            res = "student";

        return res;
    }

    function updateBalance(string memory rec,string memory add,int amt) public
    {
        accountHolder storage acc = getAccount[add];
        acc.bal -= amt;
        acc.reciept.push(rec);
    }
}